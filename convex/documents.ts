import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
//* get all documents function
export const get = query({
  handler: async (ctx) => {
    //* check if user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User not Authenticated");
    //* query all documents and return it
    const documents = await ctx.db.query("documents").collect();
    return documents;
  },
});


//* simply get all non archieved documents 
export const getUnArchievedDocuments = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not Authenticated")

    const userId = identity.subject;

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user', q => q
        .eq('userId', userId))
      .filter(q => q.eq(q.field('isArchieved'), false))
      .order('desc')
      .collect();
    return documents;

  }
})

//* to use it for the list of documents by parentDocument
export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id('documents'))
  },
  handler: async (ctx, args) => {
    //*Checks if Authenticated
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Authentication Failed")
    //* Get user Id if true
    const userId = identity.subject;
    //* Appropriate data (child documents by parent)
    const documents = ctx.db
      .query('documents')
      .withIndex('by_user_parent', q =>
        q
          .eq('userId', userId)
          .eq('parentDocument', args.parentDocument))
      .filter(q => q.eq(q.field('isArchieved'), false))
      .order('desc')
      .collect()
    return documents;
  }
})

//* create note function 
export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id('documents')),
  },
  //* ctx == context containing useful database related objects
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity)
      //* temporary soln
      throw new Error("Not Authorized");

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchieved: false,
      isPublished: false
    });
    return document;
  },
});


export const archieve = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not Authenticated')

    const userId = identity.subject;
    const existingDocument = await ctx.db.get(args.id)
    if (!existingDocument) throw new Error('Document not found')

    if (existingDocument.userId !== userId) throw new Error('Not Authenticated');
    //* move it to archieve

    //*catch all child nodes recursively
    const recursiveArchieve = async (documentId: Id<'documents'>) => {
      const children = await ctx.db
        .query('documents')
        .withIndex('by_user_parent', q => q
          .eq('userId', userId)
          .eq('parentDocument', documentId))
        .collect();


      for (let child of children) {
        await ctx.db.patch(child._id, { isArchieved: true });
        await recursiveArchieve(child._id);
      }

    }

    const document = ctx.db.patch(existingDocument._id, {
      isArchieved: true,
    });
    recursiveArchieve(args.id);
    return document;
  }
})


//* Get all documents with isArchieved = false

export const getArchieved = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not Authenticated');

    const userId = identity.subject;

    const documents = ctx.db
      .query('documents')
      .withIndex('by_user', q => q
        .eq('userId', userId))
      .filter(q => q.eq(q.field('isArchieved'), true))
      .order('desc')
      .collect()
    return documents;
  }
});

//* TO set isArchieved back to  false recursively

export const unArchieve = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not Authenticated')

    const userId = identity.subject;
    const existingDocuments = await ctx.db.get(args.id)

    if (!existingDocuments) throw new Error('Document not found');
    if (existingDocuments.userId !== userId) throw new Error('Not Authorized');

    //* Recursively restore Archieved documents
    const recursiveRestore = async (documentId: Id<'documents'>) => {
      const children = await ctx.db.query('documents')
        .withIndex('by_user_parent', q => q
          .eq('userId', userId)
          .eq('parentDocument', documentId))
        .collect()

      //* calling this function for each children
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchieved: false,
        });
        recursiveRestore(child._id);
      }
    }


    const options: Partial<Doc<'documents'>> = {
      isArchieved: false,
    }


    if (existingDocuments.parentDocument) {
      const parent = await ctx.db.get(existingDocuments.parentDocument);

      if (parent?.isArchieved) {
        options.parentDocument = undefined;

      }
    }
    const document = await ctx.db.patch(args.id, options);
    recursiveRestore(args.id);
    return document;
  }
})

//* Delete Note
export const remove = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) throw new Error('Not Authenticated');

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) throw new Error('Document not found');
    if (existingDocument.userId !== userId) throw new Error('Unauthorized');

    const document = await ctx.db.delete(args.id)

    return document;
  }
});

export const getById = query({
  args: { documentId: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    const document = await ctx.db.get(args.documentId)
    //* accessible without Auth if its published
    if (document?.isPublished && !document.isArchieved)
      return document;

    if (!identity) throw new Error('Not Authenticated')
    const userId = identity.subject;

    if (document?.userId !== userId) {
      throw new Error('Not Authorized')
    }


    return document;
  }
})

export const update = mutation({
  args: {
    id: v.id('documents'),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthenticated');
    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(id);
    if (!existingDocument) throw new Error('Document not found')

    if (existingDocument.userId !== userId) throw new Error('Unauthorized');

    const document = await ctx.db.patch(id, { ...rest })

    return document;
  }
})
export const removeIcon = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("UnAuthenticated");

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (existingDocument?.userId !== userId) throw new Error('Unauthorized');

    const document = await ctx.db.patch(args.id, { icon: undefined })

    return document;
  }
})

export const removeCoverImage = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {

    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    const existingDocument = await ctx.db.get(args.id)
    const userId = identity.subject;

    if (!existingDocument) throw new Error('Document not found')
    if (existingDocument?.userId !== userId) throw new Error("Unauthorized")

    const document = await ctx.db.patch(args.id, {
      coverImage: undefined
    });

    return document;
  },
})



export const removeAll = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error('Unauthenticated');

    const userId = identity.subject;

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user', q =>
        q.eq('userId', userId))
      .filter(q => q.eq(q.field('isArchieved'), true))
      .collect();

    documents.forEach(async (document) => {
      await ctx.db.delete(document._id);
    })

  },
})