const namespace = "Lists";
export const Append = {
    id: "Append",
    namespace,
    description: "Appends an item to a list",
    inputs: {
        list: { description: "The list" },
        item: { description: "The item to append" },
    },
    outputs: { list: { description: "The resulting list" } },
    run: ({ list, item }, { list: outputList }) => {
        outputList.next([...list, item]);
    },
    icon: "fa-plus",
};
