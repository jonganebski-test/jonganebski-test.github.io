export const formatDate = (dateString: string) => {
  const targetDate = new Date(dateString).getTime();
  const today = Date.now();
  const timeLapse = today - targetDate;
  if (timeLapse < 0) {
    return "Future Event";
  }
  const oneDay = 1000 * 60 * 60 * 24;
  const oneWeek = oneDay * 7;
  if (timeLapse < oneDay) {
    return "Today";
  } else if (timeLapse < oneWeek) {
    const lapseInDays = Math.floor(timeLapse / oneDay);
    return `${lapseInDays} day${1 < lapseInDays ? "s" : ""} ago`;
  } else {
    return new Date(dateString).toLocaleDateString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

export const getExcerpt = (file, options) => {
  const { content } = file;
  if (typeof content === "string") {
    const splited = content.split("\n");

    let i = 0;
    const paragraphs: string[] = [];
    while (
      paragraphs.reduce((acc, paragraph) => {
        return acc + paragraph?.length;
      }, 0) < 200 &&
      i < splited.length
    ) {
      let paragraph = splited[i];
      if (
        paragraph !== "" &&
        !paragraph?.startsWith("```") &&
        !paragraph?.startsWith("<")
      ) {
        if (paragraph.startsWith("#")) {
          paragraph = paragraph.replace(/[#]/g, "");
        }
        paragraphs.push(paragraph.trim());
      }
      ++i;
    }
    if (
      250 <
      paragraphs.reduce((acc, paragraph) => {
        return acc + paragraph?.length;
      }, 0)
    ) {
      const str = paragraphs.join(" ");
      const arr = str.split("");
      while (200 < arr.length) {
        const removed = arr.pop();
        if (arr.length < 250 && removed === " ") {
          break;
        }
      }
      const excerpt = arr.join("") + "...";
      file.excerpt = excerpt;
    } else {
      const excerpt = paragraphs.join(" ") + "...";
      file.excerpt = excerpt;
    }
  }
};
