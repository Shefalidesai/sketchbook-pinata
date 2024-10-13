import Menu from "@/components/Menu"
import Toolbox from "@/components/Toolbox"
import Board from "@/components/Board"


export default function Home({ onLogin }) {
 
  return (
    <>
        
    <div>
    <Menu />
      <Toolbox />
      <Board />
    </div>
     
    </>
  )
}
