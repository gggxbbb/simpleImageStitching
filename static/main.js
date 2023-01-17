class CanvasData {
    static drawn;
    static num;
    static width;
    static height;
}

function initCanvas(num) {
    const canvas = document.getElementById("canvas");
    canvas.width = 2000;
    canvas.height = canvas.width * 2;
    CanvasData.drawn = 0;
    CanvasData.num = num;
    CanvasData.width = canvas.width;
    CanvasData.height = canvas.height;


    canvas.height += canvas.width * 0.1;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = (canvas.width * 0.1 * 0.8) + "px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(new Date().toLocaleDateString(), canvas.width - 5 * canvas.width * 0.1 * 0.8, canvas.height - canvas.width * 0.1 * 0.1);

    drawLines(canvas, num);
}

function drawLines(canvas, num) {
    const width = CanvasData.width;
    const height = CanvasData.height;
    const ctx = canvas.getContext("2d");
    ctx.color = "#DCDCDC";
    //边框线
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.lineTo(width, height);
    ctx.lineTo(width, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    //横线
    const ys = [height / 2, height / 4, height * 3 / 4];
    for (let y in ys) {
        ctx.beginPath();
        ctx.moveTo(0, ys[y]);
        ctx.lineTo(width, ys[y]);
        ctx.stroke();
    }
    //竖线
    if (num === 7) {
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 4);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
    } else if (num === 8) {

        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
    }
}

function getToPut() {
    if (CanvasData.num === 7) {
        switch (CanvasData.drawn + 1) {
            case 1:
                return [0, 0];
            case 2:
                return [CanvasData.height / 4, 0];
            case 3:
                return [CanvasData.height / 4, CanvasData.width / 2];
            case 4:
                return [CanvasData.height / 2, 0];
            case 5:
                return [CanvasData.height / 2, CanvasData.width / 2];
            case 6:
                return [CanvasData.height * 3 / 4, 0];
            case 7:
                return [CanvasData.height * 3 / 4, CanvasData.width / 2];
            default:
                CanvasData.drawn = 0;
                return [0, 0];
        }
    } else if (CanvasData.num === 8) {
        switch (CanvasData.drawn + 1) {
            case 1:
                return [0, 0];
            case 2:
                return [0, CanvasData.width / 2];
            case 3:
                return [CanvasData.height / 4, 0];
            case 4:
                return [CanvasData.height / 4, CanvasData.width / 2];
            case 5:
                return [CanvasData.height / 2, 0];
            case 6:
                return [CanvasData.height / 2, CanvasData.width / 2];
            case 7:
                return [CanvasData.height * 3 / 4, 0];
            case 8:
                return [CanvasData.height * 3 / 4, CanvasData.width / 2];
            default:
                CanvasData.drawn = 0;
                return [0, 0];
        }
    }
}

function getPicSize() {
    if (CanvasData.num === 7 && CanvasData.drawn === 0) {
        return [CanvasData.height / 4, CanvasData.width, true];
    } else {
        return [CanvasData.height / 4, CanvasData.width / 2, false];
    }
}

function min(width, height) {
    return width < height ? width : height;
}

function cutPicInto2by1(pic) {
    let pic2by1 = document.createElement("canvas");
    pic2by1.width = min(pic.width, pic.height * 2);
    pic2by1.height = pic2by1.width / 2;
    let ctx = pic2by1.getContext("2d");
    ctx.drawImage(pic, (pic2by1.width - pic.width) / 2, (pic2by1.height - pic.height) / 2);
    return pic2by1;
}

function cutPicInto1by1(pic) {
    let pic1by1 = document.createElement("canvas");
    pic1by1.width = min(pic.width, pic.height);
    // noinspection JSSuspiciousNameCombination
    pic1by1.height = pic1by1.width;
    let ctx = pic1by1.getContext("2d");
    ctx.drawImage(pic, (pic1by1.width - pic.width) / 2, (pic1by1.height - pic.height) / 2);
    return pic1by1;
}

function drawPic(pic, text = "") {
    let toPut = getToPut();
    let picSize = getPicSize();
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    //裁剪图片
    if (picSize[2]) {
        pic = cutPicInto2by1(pic);
    } else {
        pic = cutPicInto1by1(pic);
    }
    ctx.drawImage(pic, 0, 0, pic.width, pic.height, toPut[1], toPut[0], picSize[1], picSize[0]);
    ctx.font = (canvas.width * 0.1 * 0.6) + "px Arial";
    ctx.fillStyle = "#C0C0C0";
    ctx.fillText(text, toPut[1] + CanvasData.width / 20, toPut[0] + CanvasData.width / 20);
    CanvasData.drawn++;
}

function download() {
    const canvas = document.getElementById("canvas");
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg");
    const date = new Date();
    link.download = "拼接图片" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ".jpeg";
    link.click();
}
