import { Button } from "@mui/material";
import dayjs from "dayjs";

export default function GalleryTable({ rows = [] }) {
  return (
    <div className="app-table">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>No Of Images</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row, i) => (
                <tr key={i}>
                  <td>{row.title}</td>
                  <td>{row.imageCount}</td>
                  <td>
                    {"Added On: " + dayjs(row.createdAt).format("MM/DD/YYYY")}
                  </td>
                  <td>
                    <Button
                      variant="text"
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        backgroundColor: "var(--primary-light-80)",
                      }}
                      href={"/gallery/" + row._id}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>"No Record Found"</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
