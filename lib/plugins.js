const commands = [];
function cmd(info, func) {
  const infos = info;
  infos.function = func;
  infos.name = new RegExp(`${"^"}\\s*${info.name}\\s*(?!\\S)(.*)$`, "i");

  
 /* if (info['on'] === undefined && info['name'] === undefined) {
    infos.on = 'message';
    infos.fromMe = false;
  }*/
  
 if (!(infos.name === undefined && infos.name)) {
    infos.dontAddCommandList = false;
  }
  if (infos.on) {
    infos.dontAddCommandList = true;
  }

  if (!info.category) infos.category = "misc";

  commands.push(infos);
  return infos;
}
let WORK_TYPE = "public"
const isPublic = WORK_TYPE.toLowerCase() === "private" ? "public" : true && false;


module.exports = {
  commands,
  cmd,
  isPublic
};