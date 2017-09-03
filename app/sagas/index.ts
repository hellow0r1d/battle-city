import { delay } from 'redux-saga'
import { fork, put, takeEvery } from 'redux-saga/effects'
import humanController from 'sagas/humanController'
import bulletsSaga from 'sagas/bulletsSaga'
import gameManager from 'sagas/gameManager'
import AIMasterSaga from 'sagas/AISaga'
import tickEmitter from 'sagas/tickEmitter'
import { CONTROL_CONFIG } from 'utils/constants'
import humanPlayerSaga from 'sagas/humanPlayerSaga'
import powerUps from 'sagas/powerUps'

export default function* rootSaga() {
  console.debug('root saga started')
  yield fork(tickEmitter)

  yield fork(bulletsSaga)
  yield fork(powerUps)

  // 生成两个humanController, 对应现实生活的游戏控制器
  yield fork(humanController, 'player-1', CONTROL_CONFIG.player1)
  yield fork(humanController, 'player-2', CONTROL_CONFIG.player2)

  yield fork(AIMasterSaga)

  yield fork(humanPlayerSaga, 'player-1', 'yellow')
  // yield fork(humanPlayerSaga, 'player-2')

  yield fork(gameManager)
}