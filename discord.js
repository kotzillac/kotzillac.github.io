const PROFILE_AVATAR = document.getElementById("profile_avatar");
const PROFILE_NAME = document.getElementById("profile_name")

const RPC_AVATAR = document.getElementById("RPC_logo")
const RPC_NAME = document.getElementById("name");
const RPC_DETAILS = document.getElementsByClassName("details")[0];
const RPC_STATE = document.getElementsByClassName("state")[0];
const RPC_DIV = document.getElementsByClassName("rpc")[0];

const DISCORD_ID = "868892102254288936";

async function updateRPC() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        if (!res.ok) { return; };
        const { data } = await res.json();
        console.log(data);
        PROFILE_NAME.textContent = data.discord_user.global_name;
        PROFILE_AVATAR.src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.png?size=256`;
        console.log(PROFILE_AVATAR.src);
        console.log(PROFILE_NAME.textContent);

        const activity = data.activities.find(act => act.type !== 4) || null

        console.log(activity)
        if (activity != null) {
            RPC_DIV.style.display = "";
            if (activity.assets?.large_image && activity.assets.large_image.startsWith("mp:external/")) {
                RPC_AVATAR.src = `https://media.discordapp.net/external/${activity.assets.large_image.replace('mp:external/', '')}`;
                RPC_NAME.textContent = activity.name
                if (activity.details) {
                    RPC_NAME.style.display = "";
                    RPC_DETAILS.textContent = activity.details;
                } else {RPC_NAME.style.display = "none";}
                if (activity.state) {
                    RPC_STATE.textContent = activity.state;
                } else {RPC_NAME.style.display = "none";}

            } else if (activity.assets?.large_image) {
                RPC_AVATAR.src = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
                RPC_NAME.textContent = activity.name
                if (activity.details) {
                    RPC_NAME.style.display = "";
                    RPC_DETAILS.textContent = activity.details;
                } else {RPC_NAME.style.display = "none";}
                if (activity.state) {
                    RPC_STATE.textContent = activity.state;
                } else {RPC_NAME.style.display = "none";}
            }
        } else {
            RPC_DIV.style.display = "none";
        }
    } catch (e) { console.error(e); }
}

setInterval(updateRPC, 10000)
updateRPC()