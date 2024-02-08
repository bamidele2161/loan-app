import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableProps {
  title: string;
  header: string[];
  body: any[][];
}
const TableComponent: React.FC<TableProps> = ({ title, header, body }) => {
  return (
    <div className="px-10">
      <h1 className="text-1xl my-10">{title}</h1>
      <Table>
        <TableCaption>A list of your recent Transactions.</TableCaption>

        <TableHeader>
          <TableRow>
            {header?.map((item: string) => (
              <>
                <TableHead>{item}</TableHead>
              </>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body?.map((item) => (
            <TableRow>
              <>
                {Object.values(item).map((value, index) => (
                  <TableCell>{value}</TableCell>
                ))}
              </>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
