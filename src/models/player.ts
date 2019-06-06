import { types } from "mobx-state-tree"

// const Coords = types.model('Coords', {
// 	x: types.number,
// 	y: types.number,
// })

export const Player = types.model("Player", {
	positionX: types.number,
	positionY: types.number,
	id: types.string,
	name: types.string
})

export const GameState = types.model("GameState", {
	players: types.array(Player)
})
	.actions((self) => ({
		addPlayer(player: typeof Player.Type) {
			self.players.push(player)
		}
	}))

const _gameState = GameState.create({
	players: []
})

export function getGameState() {
	return _gameState
}


export const initPlayer = (id: string, name: string, coords: { x: number, y: number } = { x: 0, y: 0 }) => {

	const _player = Player.create({
		id,
		name,
		positionX: coords.x,
		positionY: coords.y,
	})

	_gameState.addPlayer(_player)

	return _player

}



