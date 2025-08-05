const namespace = "Lists";
export const Reverse = {
    id: "Reverse",
    icon: "fa-list",
    namespace,
    description: "Reverses a list",
    inputs: { list: { description: "List" } },
    outputs: { reversed: { description: "Reversed list" } },
    run: ({ list }, { reversed }) => reversed.next(list.reverse()),
};
