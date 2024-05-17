export const insertBreaks = (text) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    if (sentences.length <= 2) {
        return text;
    }

    const firstPart = sentences.slice(0, 2).join(' ');
    const remainingPart = sentences.slice(2).join(' ');

    return `${firstPart}<br /><br />${remainingPart}`;
};
