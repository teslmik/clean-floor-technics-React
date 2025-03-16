export const modifyVideoLink = (videoLink: string | undefined) => {
  if (videoLink) {
    return videoLink.replace("youtu.be", "www.youtube.com/embed");
  }
  return videoLink;
};
