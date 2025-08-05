import * as fs from "fs";
export const Exists = {
    id: "Exists",
    icon: "fa-file",
    namespace: "File System",
    description: "Checks if a file exists",
    inputs: { path: { description: "Path to the file" } },
    outputs: { exists: { description: "Whether the file exists" } },
    run: async ({ path }, { exists }) => {
        return exists.next(await fs.promises.access(path, fs.constants.F_OK));
    },
};
