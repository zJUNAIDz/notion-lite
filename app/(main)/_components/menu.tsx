import { Id } from "@/convex/_generated/dataModel";
interface Props {
  documentId: Id<"documents">;
}
const Menu = ({ documentId: id }: Props) => {
  return <div>Menu</div>;
};

export default Menu;
