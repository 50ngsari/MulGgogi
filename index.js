const Discord = require("discord.js");
const { Client, Attachment } = require('discord.js');
const bot = new Client();
const ytdl = require("ytdl-core");

const token = 'toooooooooooeken';

var servers  = {};

//봇 가동시 출력 메세지

bot.on('ready', () =>{
    console.log('물꼬기 노동 시작');
    bot.user.setActivity('$명령어로 명령어를 확인해주세요 :3', { type: 'PLAYING'}).catch(console.error);
    
})

//인사
bot.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.cache.find(channel => channel.name === "환영합니다");
    if(!channel) return;


    channel.send(`서버에 오신것을 환영합니다, ${member}님!`)

});

//칭호 설정, $으로 통일.

const PREFIX = '$';

bot.on('message', message=>{
    if (!message.content.startsWith(PREFIX)) return;
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let args=message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){

//명령어

// 200525, 명령어 DM으로 오도록 수정 마침.

        case '명령어':
            message.author.send('**명령어 앞에 $[달러]를 붙이는걸 잊지 마세요!**\n   \n> **==== 기본 명령어 ====**\n $명령어 - 물꼬기의 명령어 전부를 확인합니다! \n $정보 - 봇의 정보를 알아볼 수 있습니다!\n $개발자 - 개발자에 대한 정보를 표시합니다!\n $아바타 - 자신의 아바타(프로필 사진)을 보내드립니다!\n  \n> **==== 음악 명령어 ====** \n $재생 <URL> - 입력한 URL의 음악을 재생합니다!(유튜브)\n $중지 - 재생중인 음악을 중지합니다!\n     \n> **==== 특수 명령어 ====**\n $물꼬기 - 뭘까요 이건..?\n $대화 <키워드> - 간단한 대화 기능입니다! 키워드를 어떤걸 넣으면 좋을지 피드백해주세요 :3\n    \n> **==== 관리자 명령어 ====**\n $킥 @닉네임 - @닉네임을 킥(추방)합니다!\n $밴 @닉네임 - @닉네임을 밴(영구 킥, 차단)합니다!\n $채팅청소 - 현재 채널의 채팅을 깔끔하게 정리합니다!');
            message.author.send('`봇 물고기에 대한 피드백을 남겨주세요!`\nhttps://docs.google.com/forms/d/e/1FAIpQLSd3v43dHpYd9EelguhKpSsxyVqxWc8ItqJJOU4agIS3EWajUA/viewform?usp=sf_link')
            message.channel.send('개인 메세지 알림을 확인해주세요!')
            break;
        
        case '정보':
            message.channel.send('> **피드백은 환영입니다!**', {
                files: ['source\\inform.png']
              })
              .catch(console.error);
            break;


        case '이스터에그':
            message.channel.send('이스터 에그를 찾으셨네요! 네, 그냥 별거 없고 이스터 에그에요! \n ~~TMI: 4월 12일이 이스터(부활절)라고 해요!~~')
            break;

        case '물꼬기':
            message.react("🐟")
            message.react("⬅️")
            message.react("👍")
        break;

        case '개발자':
            message.channel.send('> ***개발 : 송사리*** \n> ***도움 : 색곰, 쿠야*** \n> ***개발자 블로그*** : ***https://blog.naver.com/songchoihue1*** \n> 물꼬기를 이용해주셔서 감사합니다 :3')
            message.react("👍")
        break;



        






//히든, 특수 명령어는 대화로 옮김.


//음악 재생 부분

        case '재생':
            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter:"audioonly"}));

                server.queue.shift();

                server.dispatcher.on("finish", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else {
                        connection.disconnect();
                    }
                    
                });
                message.channel.send('음악을 재생합니다 :]')
            }


            if(!args[1]){
                message.channel.send("재생할 음악의 **링크**를 입력해주세요!")
                return;
            }

            if(!message.member.voice.channel){
                message.channel.send("음성 채널에 들어가신 후 명령어를 입력해주세요!");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];
            
            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
                play(connection, message);
            })
        break;

        case '중지':
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            message.channel.send("음악을 중지했습니다. 음성 채널을 퇴장합니다 :]")
        break;


      }

})


//대화 부분, 추후 분리 예정.

bot.on('message', msg=>{

    if(msg.content ===  "$대화"){
        msg.reply('*$대화 <키워드> 부탁드려요 :)*')
    }

    if(msg.content ===  "$대화 안녕"){
        msg.reply('안녕하세요!')
    }

    if(msg.content ===  "$대화 안녕하세요"){
        msg.reply('만나서 반가워요 :3')
    }

    if(msg.content === "$대화 반가워"){
        msg.reply('반가워요 :3')
    }

    if(msg.content === "$대화 반가워요"){
        msg.reply('저도 반가워요 :3')
    }

    if(msg.content === "$대화 배고파"){
        msg.reply('~~밥 먹으세요 :3 이렇게 간단한것을.. :thinking: ~~')
    }

    if(msg.content === "$대화 배고프다"){
        msg.reply('밥은 제때제때 드세요 :3 ~~저도 마침 배터리 충전하러 갈 시간이니 이만..~~')
    }

    if(msg.content === "$대화 야"){
        msg.channel.send('~~꿀벌~~ 무슨 일이세요? :3')
    }

    if(msg.content ===  "$대화 콜록"){
        msg.channel.send('**<지금 누가 기침소리를 내었어?>** 몸 조심하세요! :3')
    }


    if(msg.content === "$대화 코로나"){
        msg.channel.send('몸 조심하세요! 마스크도 꼭 쓰시고요 :3')
    }
    if(msg.content === "$대화 코로나19"){
        msg.channel.send('몸 조심하세요! 되도록 외출도 자제하시고요 :3')
    }
    if(msg.content === "$대화 코로나바이러스"){
        msg.channel.send('몸 조심하세요! 소독제도 중요하지만 손도 자주자주 씻어줘요 :3')
    }


    if(msg.content ===  "$대화 쿠엔틴"){
        msg.channel.send('쟈를레엔ㄴ~~ :3')
    }

    if(msg.content ===  "$대화 물꼬기"){
        msg.channel.send('누가 저 부르셨나요? \n~~누가 저보고 물고기면서 왜 프로필 사진이 포유류인 고래냐던데.. 어쩌죠 :/~~')
    }

    if(msg.content ===  "$대화 태보"){
        msg.channel.send('하루에 25분만! 태보의 세계로! 떠나봅시다!\~~사실 태보에 대해서는 태어난지 얼마 안된 저보다는 **복면좀비**라는 분이 더 잘 아실거에요 :3~~')
    }

    if(msg.content ===  "$대화 디스코드"){
        msg.channel.send('지금 채팅하고 있는 곳 말이죠?')
    }

    if(msg.content === "$대화 흠터") {
        msg.channel.send("레스팅 :thinking:");
    }

    if(msg.content === "$대화 송사리"){
        msg.channel.send('절 만든 개발자인데 이름을 아시네요! ~~같은 말 : 멍청이와 친분이 있으시군요!~~')
    }

    if(msg.content === "$대화 색곰"){
        msg.channel.send('절 만드는데 큰 도움이 됬다고 들었어요 :3 ~~사실상 저는 반은 색곰이 만든거랍니다~~')
    }

    if(msg.content === "$대화 회색곰"){
        msg.channel.send('절 만드는데 큰 도움이 됬다고 들었어요 :3 ~~사실상 저는 반은 색곰이 만든거랍니다~~')
        msg.channel.send('여담이지만 최근에 회색 이미지를 버리고 그냥 색곰으로 닉네임을 바꿨다고해요 :3')

    }
    
    if(msg.content === "$대화 복면좀비"){
        msg.channel.send('***그 댄스***', {
            files: ['source\\zomdance.mp4']
        })
    }

    if(msg.content === "$대화 델치킨"){
        msg.channel.send('***델치킨! 델치킨! 델치킨!*** ~~델 치킨사..~~', {
            files: ['source\\DELCHICKEN.mp4']
        })
    }

    if(msg.content === "$대화 싸우자"){
        msg.channel.send('그렇다면, EMP 발동! 아 잠만.. 그러면 나도.. ~~X~~', {
            files: ['source\\giphy.gif']
        })
    }

    if(msg.content === "$대화 스타드림"){
        msg.channel.send('절 만들어준 사람이 그 팀에 소속되있다고 들었던거같아요 :3')
    }

    if(msg.content === "$대화 마인크래프트"){
        msg.channel.send('*마인크래프트 해도해도 잘 질리지 않는거같아요!*.. 라고 송사리가 그러더라고요:3', {
            files: ['source\\chicken.gif']
        })
    }

    if(msg.content === "$대화 섹"){
        msg.channel.send('끝말잇기인가요? **그렇다면..** ~~무엇을 바라는가 인간이여 :thinking:~~')
    }

    if(msg.content === "$대화 리베"){
        msg.channel.send('까칠하지만 알고보단 친절한 형이더라고요 :3')
    }

    if(msg.content === "$대화 Fredboat"){
        msg.channel.send('노래를 정말 잘 부르는 봇이라고 들었어요 :3')
    }

    if(msg.content === "$대화 프레드봇"){
        msg.channel.send('노래를 정말 잘 부르는 봇이라고 들었어요 :3')
    }

    if(msg.content === "$대화 프레드보트"){
        msg.channel.send('노래를 정말 잘 부르는 봇이라고 들었어요 :3')
    }

    if(msg.content === "$대화 Vexera"){
        msg.channel.send("그 분이 노래 잘 부르신다던데.. 저도 분발할게요 :3")
    }

    if(msg.content === "$대화 백세라"){
        msg.channel.send("그 분이 노래 잘 부르신다던데.. 저도 분발할게요 :3")
    }
    
    if(msg.content === "$대화 Groovy"){
        msg.channel.send("저도 그 분처럼 노래 잘 부르고 싶네요 :3")
    }

    if(msg.content === "$대화 그루비"){
        msg.channel.send("저도 그 분처럼 노래 잘 부르고 싶네요 :3")
    }

    if(msg.content === "$대화 시리야"){
        msg.channel.send("잘못 찾아오셨어요 XD")
    }

    if(msg.content === "$대화 하이 빅스비"){
        msg.channel.send("$대화 잘못 찾아오셨어요 XD")
    }
    
    if(msg.content === "$대화 개발자"){
        msg.channel.send("*지금 코드를 작성중인 저를 말하시는건가요?*.. 무시하세요! 송사리가 한 말이에요 :3")
    }

    if(msg.content === "$대화 쿠야"){
        msg.channel.send("쿠야라는 분도 봇을 만들고 있다고 들었는데.. 기대중이에요 :3")
    }

    if(msg.content === "$대화 키"){
        msg.channel.send("워드! 이왕 이렇게 된거 어떤 키워드를 대화에 넣으면 좋을지 추천해주세요 :3")
    }

    if(msg.content === "$대화 시온"){
        msg.channel.send("그림을 잘 그린다고 들었어요! 놀랍게도 다 마우스로 그렸다던데... :ㅇ")
    }

    if(msg.content === "$대화 심심해"){
        msg.channel.send("심심하면 저 좀 놀아주세요 :3")
    }

    if(msg.content === "$대화 유니버스"){
        msg.channel.send("스타드림 팀장이라고 언제였는진 몰라도 들어봤던거같아요 :3")
    }

    if(msg.content === "$대화 문도"){
        msg.channel.send("*(츄릅) 때린다...* ~~문도 빙의~~")
    }
    
    if(msg.content === "$대화 아틀라스"){
        msg.channel.send("아마 저랑 비슷한 때에 개발이 시작됬을거에요 :3 친구나 마찬가지이죠!")
    }

    if(msg.content === "$대화 모동숲"){
        msg.channel.send("모여봐요 동물의 숲 말씀하시는건가요? 정말 재밌다고 들었어요 :3 ")
    }

    if(msg.content === "$대화 동숲"){
        msg.channel.send("정말 재밌다고 들었어요 :3 ")
    }

    if(msg.content === "$대화 동물의 숲"){
        msg.channel.send("정말 재밌다고 들었어요 :3 ")
    }

    if(msg.content === "$대화 동물의숲"){
        msg.channel.send("정말 재밌다고 들었어요 :3 ")
    }

    if(msg.content === "$대화 모여봐요 동물의 숲"){
        msg.channel.send("정말 재밌다고 들었어요 :3 ")
    }

    if(msg.content === "$대화 모여봐요 동물의숲"){
        msg.channel.send("정말 재밌다고 들었어요 :3 ")
    }

    if(msg.content === "$대화 모동숲"){
        msg.channel.send("정말 재밌다고 들었어요 :3 ")
    }

    if(msg.content === "$대화 버그"){
        msg.channel.send("왠진 몰라도 사람들이 버그를 정말 싫어하나봐요. 기계도 실수 할 수도 있지.. :(")
    }

    if(msg.content === "$대화 환타맛 치킨"){
        msg.channel.send("...?")
    }

})


//관리자용 명령어

bot.on('message', message=>{
    if (!message.content.startsWith(PREFIX)) return;
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let args=message.content.substring(PREFIX.length).split(" ");
    switch(args[0]){
            case '채팅청소':
            if(!message.member.roles.cache.some(r => r.name === "관리자") && !message.member.roles.cache.some(r => r.name === "부관리자") && !message.member.roles.cache.some(r => r.name === "ㅣ관리자ㅣ") && !message.member.roles.cache.some(r => r.name === "ㅣ부관리자ㅣ")) return message.channel.send('권한이 없습니다!')
                message.channel.send(".\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n======= ***채팅청소 완료!*** =======");
            break;

            case '킥':
            if(!message.member.roles.cache.some(r => r.name === "관리자") && !message.member.roles.cache.some(r => r.name === "부관리자") && !message.member.roles.cache.some(r => r.name === "ㅣ관리자ㅣ") && !message.member.roles.cache.some(r => r.name === "ㅣ부관리자ㅣ")) return message.channel.send('권한이 없습니다!')
            if(!args[1]) message.reply('킥할 유저의 닉네임을 올바르게 입력해주세요! ex) $킥 @닉네임')

            var user = message.mentions.users.first();

            if(user){
                var member = message.guild.member(user);

                if(member){
                    member.kick('서버에서 킥 당하셨습니다!').then(() =>{
                        message.reply(`${user.tag}를 킥했습니다.`);
                    }).catch(err => {
                        message.reply('[오류] 킥 실패')
                    });
                } else{
                    message.reply("서버에 존재하지 않는 유저입니다!")

                }
            } else {
            }
            

        break;
    }})



bot.on('message', message=>{
    if (!message.content.startsWith(PREFIX)) return;
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let args=message.content.substring(PREFIX.length).split(" ");
    switch(args[0]){

    case '밴':
        if(!message.member.roles.cache.some(r => r.name === "관리자") && !message.member.roles.cache.some(r => r.name === "부관리자") && !message.member.roles.cache.some(r => r.name === "ㅣ관리자ㅣ") && !message.member.roles.cache.some(r => r.name === "ㅣ부관리자ㅣ")) return message.channel.send('권한이 없습니다!')
        var user = message.mentions.users.first();

        if (user) {
            var member = message.guild.member(user);

            if (member) {
                member.ban({ression: 'BAN!'}).then(() =>{
                    message.reply(`${user.tag}를 밴했습니다! `)
                })
            } else {
                message.reply("서버에 존재하지 않는 유저입니다!")
            }
        } else {
            message.reply('밴할 유저의 닉네임을 올바르게 입력해주세요! ex) $밴 @닉네임')
        }


    }})



//아바타 명령어
bot.on("message", message => {
    if (message.content.startsWith('$아바타')){
        var user = message.mentions.users.first();
        if (!user) user = message.author;
        var avatar = new Discord.MessageEmbed()
        .setTitle(user.username + "님의 아바타")
        .setDescription('타인의 아바타를 다운로드 하실땐 꼭 허락을 맡아주세요!')
        .setColor("RANDOM")
        .setImage(user.avatarURL())
        message.channel.send(avatar)
    }
});



//로긘
bot.login(token);