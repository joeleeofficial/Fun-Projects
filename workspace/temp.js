// vote tracker save tag
client.on('message', message => {
const prefix = "-"
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    var webhook = args[0]
  

const AddTag = new Vote({server: message.guild.id, webhook: webhook, id: args[1]});
if(command == "track"){
    if(webhook == "" || webhook == undefined) {
      message.reply(
    }
if(saveTag == "" || saveTag == undefined){
const exampleEmbed = {
	color: "#42ddf5",
	description: '[`Please Provide A Clash Of Clans Tag To Save`](https://brawley.is-a.dev/tag)\n\n**Usage :** `-save.coc <#YOUR_TAG>`',
	image: {
		url: 'https://brawley.is-a.dev/assets/savebstag.png',
	},
};

message.channel.send({ embed: exampleEmbed });
}else {
  ClashOfClansTags.find({ author: message.author.id }, function (err, tag) {
const userTag = tag;
if(userTag == "" || userTag == undefined){
axios.get(`https://cocproxy.royaleapi.dev/v1/players/%23${saveTag}`, configCoC).then(response => {
AddTag.save((err,result)=>{
    if(err) console.log(err)
    console.log(result);
    message.reply(`Saved`)

})
}).catch(error => {
  const exampleEmbed = {
	color: "#42ddf5",
	description: "[`Please Provide A Valid Tag`](https://brawley.is-a.dev/tag)\n\n**E.g. :** `-save.coc P2PGLUPR`",

};
message.channel.send({ embed: exampleEmbed })
})
}else {
const exampleEmbed = {
	color: "#42ddf5",
	description: "[`You've Already Saved Your Tag`](https://brawley.is-a.dev/tag/Saved)\n\n**To Delete :** `-delete.coc`",

};

message.channel.send({ embed: exampleEmbed });}
});
}

}

if(command == "delete.coc"){
  ClashOfClansTags.find({ author: message.author.id }, function (err, tag) {
const userTag = tag;
if(userTag == "" || userTag == undefined){

  message.reply("You Haven't Save Your Tag")
}else {
 ClashOfClansTags.deleteOne({ author: message.author.id }, function (err) {
});
const exampleEmbed = {
	color: "#42ddf5",
	description: '[`Tag Deleted : '+tag[0].tag+'`](https://brawley.is-a.dev/tag)',
	thumbnail: {
		url: 'https://brawley.is-a.dev/assets/delete.png',
	},
  timestamp: new Date(),
 footer: {
		text: 'save again : -save.coc',
	},
};

message.channel.send({ embed: exampleEmbed });
}
    
  });
}
if(command == "safe.coc"){

ClashOfClansTags.find({ author: message.author.id }, function (err, tag) {
const userTag = tag;
if(userTag == "" || userTag == undefined){

  message.reply("You Haven't Save Your Tag")
}else {
  message.reply(tag[0].tag)
}
});
}


})
