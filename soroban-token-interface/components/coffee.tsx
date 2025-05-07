"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Coffee, RefreshCw, Gift, CheckCircle } from "lucide-react"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { formatTokenAmount } from "@/lib/utils"

export default function Coffee() {
  const { isConnected, publicKey } = useWalletStore()
  const [points, setPoints] = useState<string | null>(null)
  const [freeCoffees, setFreeCoffees] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isAddingPoint, setIsAddingPoint] = useState(false)
  const [isCheckingFreeCoffee, setIsCheckingFreeCoffee] = useState(false)
  const [isRedeemingFreeCoffee, setIsRedeemingFreeCoffee] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const { toast } = useToast()

  const [recipient, setRecipient] = useState("")
  
  const isAdmin = isConnected 

  // Memoize fetchData to avoid recreating it on every render
  const fetchData = useCallback(async () => {
    if (!isConnected) return

    setIsLoading(true)
    try {
      // Mock API call to read_coffee_points and read_free_coffee
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPoints("8") // Mock points
      setFreeCoffees("0") // Mock free coffees
    } catch (error) {
      console.error("Failed to fetch data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch coffee points or free coffees",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [isConnected, toast])

  useEffect(() => {
    if (isConnected && !hasInitialized) {
      fetchData()
      setHasInitialized(true)
    }

    if (!isConnected) {
      setPoints(null)
      setFreeCoffees(null)
      setHasInitialized(false)
    }
  }, [isConnected, hasInitialized, fetchData])

  const refreshData = () => {
    setIsRefreshing(true)
    fetchData()
  }

  const handleAddCoffeePoint = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to add points",
        variant: "destructive",
      })
      return
    }

    if (!isAdmin) {
      toast({
        title: "Unauthorized",
        description: "Only admins can add coffee points",
        variant: "destructive",
      })
      return
    }

    setIsAddingPoint(true)
    try {
      // Mock API call to add_coffee_point
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const currentPoints = parseInt(points || "0")
      setPoints((currentPoints + 1).toString()) 
      toast({
        title: "Point Added",
        description: "1 coffee point added successfully",
      })
    } catch (error) {
      console.error("Failed to add coffee point:", error)
      toast({
        title: "Error",
        description: "Failed to add coffee point. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingPoint(false)
    }
  }

  const handleCheckFreeCoffee = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to check free coffee",
        variant: "destructive",
      })
      return
    }

    if (!isAdmin) {
      toast({
        title: "Unauthorized",
        description: "Only admins can check free coffee eligibility",
        variant: "destructive",
      })
      return
    }

    setIsCheckingFreeCoffee(true)
    try {
      // Mock API call to check_free_coffee
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const currentPoints = parseInt(points || "0")
      if (currentPoints >= 10) {
        setPoints((currentPoints - 10).toString())
        setFreeCoffees((parseInt(freeCoffees || "0") + 1).toString())
        toast({
          title: "Free Coffee Granted",
          description: "10 points redeemed for 1 free coffee",
        })
      } else {
        toast({
          title: "Not Enough Points",
          description: `You need at least 10 points. Current: ${points}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to check free coffee:", error)
      toast({
        title: "Error",
        description: "Failed to check free coffee. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCheckingFreeCoffee(false)
    }
  }

  const handleRedeemFreeCoffee = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to redeem free coffee",
        variant: "destructive",
      })
      return
    }

    if (!isAdmin) {
      toast({
        title: "Unauthorized",
        description: "Only admins can redeem free coffee",
        variant: "destructive",
      })
      return
    }

    setIsRedeemingFreeCoffee(true)
    try {
      // Mock API call to redeem_free_coffee
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const currentFreeCoffees = parseInt(freeCoffees || "0")
      if (currentFreeCoffees > 0) {
        setFreeCoffees((currentFreeCoffees - 1).toString())
        toast({
          title: "Free Coffee Redeemed",
          description: "1 free coffee redeemed successfully",
        })
      } else {
        toast({
          title: "No Free Coffee",
          description: "No free coffee available to redeem",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to redeem free coffee:", error)
      toast({
        title: "Error",
        description: "Failed to redeem free coffee. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRedeemingFreeCoffee(false)
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Please connect your wallet to manage your coffee points and free coffees.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Coffee Points</CardTitle>
          <Button variant="ghost" size="icon" onClick={refreshData} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading data...</span>
            </div>
          ) : (
            <div>
              <div className="text-3xl font-bold">{points ? formatTokenAmount(points) : "0"}</div>
              <p className="text-xs text-muted-foreground">POINTS</p>
              <div className="mt-2 text-sm">
                Free Coffees: <span className="font-bold">{freeCoffees || "0"}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Coffee Point</CardTitle>
          <CardDescription>Send 10 token to shop owner and add 1 point for a coffee purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCoffeePoint}>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="recipient">Coffee Shop Address</Label>
                    <Input
                        id="recipient"
                        placeholder="G..."
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </div>
            </div>

            <Button className="mt-4 w-full" type="submit" disabled={isAddingPoint || !isAdmin}>
              {isAddingPoint ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  
                  Buy Coffee
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Check Free Coffee</CardTitle>
          <CardDescription>Redeem 10 points for a free coffee</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCheckFreeCoffee}>
            <Button className="mt-4 w-full" type="submit" disabled={isCheckingFreeCoffee || !isAdmin}>
              {isCheckingFreeCoffee ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Gift className="mr-2 h-4 w-4" />
                  Check Free Coffee
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redeem Free Coffee</CardTitle>
          <CardDescription>Use an available free coffee</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRedeemFreeCoffee}>
            <Button className="mt-4 w-full" type="submit" disabled={isRedeemingFreeCoffee || !isAdmin}>
              {isRedeemingFreeCoffee ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redeeming...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Redeem Free Coffee
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}