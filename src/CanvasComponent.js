import React from 'react';
import Mushroom from './MushRoom.png';
import PaperMario from './PaperMario.png';
import Loadimage from 'image-promise';


class CanvasComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            moves: 0,
            MushRoomsArray: []
        }


    }
    componentDidMount() {
        this.updateCanvas(400, 400);
        this.state.MushRoomsArray = this.createMushRooms()
        this.createPaperMario()
        this.components(this.state.MushRoomsArray)
    }

    createMushRooms() {
        let MushRooms = [];
        for (let i = 0; i < 11; i++) {
            let minHeight = 0;
            let maxHeight = 10;
            let minWidth = 0;
            let maxWidth = 10;
            let x = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight) * 40;
            let y = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth) * 40;
            let r = { x: x, y: y };
            console.log(MushRooms)
            this.checkForRepeat(x, y, MushRooms);
            MushRooms.push(r);
        }

        return MushRooms;
    }
    checkForRepeat(x, y, array) {
        let minHeight = 0;
        let maxHeight = 10;
        let minWidth = 0;
        let maxWidth = 10;
        for (let j = 0; j < array.length; j++) {
            if (array[j].x == x && array[j].y == y) {
                array.splice(j, 1);
                let x = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight) * 40;
                let y = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth) * 40;
                let r = { x: x, y: y };
                array.push(r);
            }
        }
        return array;
    }
    updateCanvas(w, h) {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.canvas.width = w
        ctx.canvas.height = h
        for (let x = 0; x <= w; x += 40) {
            for (var y = 0; y <= h; y += 40) {
                ctx.moveTo(x, 0)
                ctx.lineTo(x, h)
                ctx.stroke()
                ctx.moveTo(0, y)
                ctx.lineTo(w, y)
                ctx.stroke()
            }
        }
    }

    components(array) {
        for (let i = 1; i < array.length; i++) {
            const image = new Image();
            image.src = Mushroom;
            const ctx = this.refs.canvas.getContext('2d');
            Loadimage(image).then(function (img) {
                ctx.drawImage(img, array[i].x, array[i].y);
            })

        }
    }
    createPaperMario(moveType) {
        const image = new Image();
        image.src = PaperMario;
        let x = this.state.MushRoomsArray[0].x;
        let y = this.state.MushRoomsArray[0].y;
        this.setState({ x: x, y: y })
        const ctx = this.refs.canvas.getContext('2d');
        Loadimage(image).then(function (img) {
            ctx.drawImage(img, x, y);
        })

    }
    component(moveType) {
        const image = new Image();
        let x = this.state.x;
        let y = this.state.y;
        let moves = this.state.moves;

        image.src = PaperMario;
        if (moveType == 'up') {
            moves += 1;
            y = y - 40;
            if (y < 0) { y = this.state.y; }
            this.setState({ x: x, y: y, moves: moves })
        }
        if (moveType == 'left') {
            moves += 1;
            x = x - 40;
            if (x < 0) { x = this.state.x; }
            this.setState({ x: x, y: y, moves: moves })
        }
        if (moveType == 'right') {
            moves += 1;
            x = x + 40;
            if (x >= 400) { x = this.state.x; }
            this.setState({ x: x, y: y, moves: moves })
        }
        if (moveType == 'down') {
            moves += 1;
            y = y + 40;
            if (y >= 400) { y = this.state.y; }
            this.setState({ x: x, y: y, moves: moves })
        }
        const ctx = this.refs.canvas.getContext('2d');
        image.onload = function () {
            ctx.drawImage(image, x, y);
        }
        this.updateCanvas(400, 400);
        let array = this.state.MushRoomsArray;
        for (var i = 1; i < array.length; i++) {
            if (array[i].x == x && array[i].y == y) {
                array.splice(i, 1);
                this.state.MushRoomsArray = array;
            }
        }
        if (this.state.MushRoomsArray.length > 1) {
            this.components(this.state.MushRoomsArray);
        }
        else if (moves > 0) {
            alert("Game Completed. Total no.of moves : " + moves + "\n Reload page to play again")
        }

    }

    render() {
        return (
            <div style={{ marginLeft: 300 }}>
                <canvas ref="canvas" />
                <div style={{ textAlign: 'center', width: 480 }}>
                    <button onClick={this.component.bind(this, 'up')}>UP</button><br /><br />
                    <button onClick={this.component.bind(this, 'left')}>LEFT</button>
                    <button onClick={this.component.bind(this, 'right')}>RIGHT</button><br /><br />
                    <button onClick={this.component.bind(this, 'down')}>DOWN</button>
                </div>
            </div>
        );
    }
}

export default CanvasComponent;