const PROFILE_AVATAR = document.getElementById("profile_avatar");
const PROFILE_NAME = document.getElementById("profile_name");
const RPC_AVATAR = document.getElementById("RPC_logo");
const RPC_NAME = document.getElementById("name");
const RPC_DETAILS = document.querySelector(".details");
const RPC_STATE = document.querySelector(".state");
const RPC_DIV = document.querySelector(".rpc");

const DISCORD_ID = "868892102254288936";

window.addEventListener('load', () => {
    
    if (typeof lanyard === 'undefined') {
        console.error("js-lanyard don`t connected in htmk");
        return;
    }

    lanyard({
        userId: "868892102254288936",
        socket: true,
        onPresenceUpdate: (data) => {
            if (!data) return;

            const user = data.discord_user;
            PROFILE_NAME.textContent = user.global_name || user.username;
            PROFILE_AVATAR.src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${user.avatar}.png?size=256`;

            const activity = data.activities.find(act => act.type !== 4);

            if (activity) {
                RPC_DIV.style.display = "";
                if (activity.type == 0) {
                    RPC_NAME.textContent = "Играет в " + activity.name;
                } else if (activity.type == 2) {
                    RPC_NAME.textContent = "Слушает " + activity.name;
                } else {
                    RPC_NAME.textContent = activity.name;
                }
                
                RPC_DETAILS.textContent = activity.details || "";
                RPC_STATE.textContent = activity.state || "";

                console.log(activity)

                if (activity.assets && activity.assets.large_image) {
                    if (activity.assets.large_image.startsWith("mp:external/")) {
                        RPC_AVATAR.src = `https://media.discordapp.net/external/${activity.assets.large_image.replace('mp:external/', '')}`;
                    } else {
                        RPC_AVATAR.src = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
                    }
                }
                else if (activity.name == "Counter-Strike 2") {
                    RPC_AVATAR.src = "https://cdn2.steamgriddb.com/icon/e1bd06c3f8089e7552aa0552cb387c92/32/512x512.png";
                    RPC_AVATAR.style.display = "";
                }
                else if (activity.application_id) {
                    RPC_AVATAR.src = `https://cdn.discordapp.com/app-icons/${activity.application_id}/icon.png`;
                    RPC_AVATAR.style.display = "";
                } 
                else {
                    RPC_AVATAR.style.display = "none";
                }
            } else {
                RPC_DIV.style.display = "none";
            }
        }
    });
});