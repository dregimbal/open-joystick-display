const Clone = require('clone')
const OJD = window.OJD

class ChromiumDriver {

    constructor(handler) {

        // Joystick Properties
        this.joysticks = [
            { connected: false, index: 0, info: '', offsetX: [0], offsetY: [0], pressedButtons: [] },
            { connected: false, index: 1, info: '', offsetX: [0], offsetY: [0], pressedButtons: [] },
            { connected: false, index: 2, info: '', offsetX: [0], offsetY: [0], pressedButtons: [] },
            { connected: false, index: 3, info: '', offsetX: [0], offsetY: [0], pressedButtons: [] },
        ]

        this.joystickInfo = ''
        this.player = 0

        this.ready = true
        this.handler = handler

        window.addEventListener("gamepadconnected", this.connectJoystick.bind(this))
        window.addEventListener("gamepaddisconnected", this.disconnectJoystick.bind(this))

    }

    setActive() { }
    setInactive() { }

    connectJoystick(e) {
        const joystick = navigator.getGamepads()[e.gamepad.index]
        this.joysticks[e.gamepad.index] = {
            connected: true,
            index: e.gamepad.index,
            info: `Player ${e.gamepad.index} - ${joystick.id}: ${joystick.buttons.length} Buttons, ${joystick.axes.length} Axes.`,
            offsetX: [0],
            offsetY: [0],
            pressedButtons: []
        }
    }

    disconnectJoystick(e) {
        this.joysticks[e.gamepad.index] = { joystick: {}, connected: false, index: e.gamepad.index, info: '', offsetX: [0], offsetY: [0], pressedButtons: [] }
    }

    isConnected() {
        return this.joysticks[this.player].connected
    }

    getJoystick() {
        if (this.joysticks[this.player].connected) {
            return navigator.getGamepads()[this.player]
        }
        return false
    }

    setOffset(direction, offset) {
        this.joysticks[this.player].offsetX[direction] = offset.x
        this.joysticks[this.player].offsetY[direction] = offset.y
    }

    getXOffset(direction) {
        if (this.joysticks[this.player].offsetX[direction] != undefined) {
            return this.joysticks[this.player].offsetX[direction]
        }
        return 0
    }
    getYOffset(direction) {
        if (this.joysticks[this.player].offsetY[direction] != undefined) {
            return this.joysticks[this.player].offsetY[direction]
        }
        return 0
    }

    getPressedButtons() {
        return this.joysticks[this.player].pressedButtons
    }

    setPressedButtons(buttons) {
        this.joysticks[this.player].pressedButtons = buttons
    }

    getInformation() {
        if (this.joysticks[this.player].connected) {
            return this.joysticks[this.player].info
        } else {
            return 'No joystick connected. Please connect a joystick and press a button to activate.'
        }
    }

    async initPorts() {
        return true
    }

    getPorts() {
        return false
    }

    getDevices() {
        return false
    }

}

module.exports.ChromiumDriver = ChromiumDriver
