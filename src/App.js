'use client'

import { useState } from 'react'
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"

export default function MahPoints() {
  const [tai, setTai] = useState(0)
  const [winMethod, setWinMethod] = useState('')
  const [winningPlayer, setWinningPlayer] = useState('')
  const [discardingPlayer, setDiscardingPlayer] = useState('')
  const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4'])
  const [playerScores, setPlayerScores] = useState([0, 0, 0, 0])

  const calculatePoints = () => {
    if (!winningPlayer || !winMethod || (winMethod === 'discard' && !discardingPlayer)) {
      alert("Please fill in all required fields")
      return
    }

    const newScores = [...playerScores]
    const winnerIndex = parseInt(winningPlayer) - 1

    if (winMethod === 'self') {
      for (let i = 0; i < 4; i++) {
        if (i === winnerIndex) {
          newScores[i] += tai * 6
        } else {
          newScores[i] -= tai * 2
        }
      }
    } else {
      const discarderIndex = parseInt(discardingPlayer) - 1
      for (let i = 0; i < 4; i++) {
        if (i === winnerIndex) {
          newScores[i] += tai * 4
        } else if (i === discarderIndex) {
          newScores[i] -= tai * 2
        } else {
          newScores[i] -= tai
        }
      }
    }

    setPlayerScores(newScores.map(score => Math.round(score)))
  }

  const resetScores = () => {
    setPlayerScores([0, 0, 0, 0])
  }

  const handleNameChange = (index = number, name = string) => {
    const newNames = [...playerNames]
    newNames[index] = name
    setPlayerNames(newNames)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-800 to-green-800 p-4">
      <Card className="w-full max-w-4xl mx-auto overflow-hidden relative z-10">
        <div className="absolute inset-0 bg-white"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-3xl font-bold text-gray-900 text-center">MahPoints</CardTitle>
          <CardDescription className="text-gray-600 text-center">Your Mahjong Point Calculator</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tai" className="text-gray-900">Tai</Label>
                <Input
                  id="tai"
                  type="number"
                  min="0"
                  value={tai}
                  onChange={(e) => setTai(parseInt(e.target.value) || 0)}
                  className="bg-gray-100 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="win-method" className="text-gray-900">How was the winning card drawn?</Label>
                <Select onValueChange={setWinMethod}>
                  <SelectTrigger id="win-method" className="bg-gray-100 text-gray-900">
                    <SelectValue placeholder="Select win method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self Draw</SelectItem>
                    <SelectItem value="discard">Won from Discard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="winning-player" className="text-gray-900">Winning Player</Label>
                <Select onValueChange={setWinningPlayer}>
                  <SelectTrigger id="winning-player" className="bg-gray-100 text-gray-900">
                    <SelectValue placeholder="Select winning player" />
                  </SelectTrigger>
                  <SelectContent>
                    {playerNames.map((name, index) => (
                      <SelectItem key={index} value={(index + 1).toString()}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {winMethod === 'discard' && (
                <div className="space-y-2">
                  <Label htmlFor="discarding-player" className="text-gray-900">Who discarded the winning card?</Label>
                  <Select onValueChange={setDiscardingPlayer}>
                    <SelectTrigger id="discarding-player" className="bg-gray-100 text-gray-900">
                      <SelectValue placeholder="Select discarding player" />
                    </SelectTrigger>
                    <SelectContent>
                      {playerNames.map((name, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-green-800 rounded-lg"></div>
              <div className="relative p-4 grid grid-cols-2 gap-4">
                <div className="col-span-2 text-center text-white font-bold mb-2">Mahjong Table</div>
                {playerNames.map((name, index) => (
                  <div key={index} className="bg-white p-2 rounded shadow flex flex-col items-center justify-center">
                    <Input
                      value={name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      className="text-center bg-transparent border-none text-gray-900 font-semibold"
                    />
                    <div className="text-gray-600">${playerScores[index]}</div>
                    <div className="mt-2 flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-6 h-8 bg-gray-200 border border-gray-300 rounded flex items-center justify-center text-xs font-bold">
                          {['🀄', '🀅', '🀆'][Math.floor(Math.random() * 3)]}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <CardFooter className="flex justify-between space-x-4 pt-4">
            <Button onClick={calculatePoints} className="flex-1 bg-green-600 text-white hover:bg-green-700">Calculate Points</Button>
            <Button onClick={resetScores} variant="outline" className="flex-1 border-green-600 text-green-600 hover:bg-green-50">Reset Scores</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}

