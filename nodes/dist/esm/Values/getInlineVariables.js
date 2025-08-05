export const getVariables = (code) => {
    return (code.match(/inputs\.([a-zA-Z]\w*)/g) || []).map((v) => v.replace(/inputs\./, ""));
};
