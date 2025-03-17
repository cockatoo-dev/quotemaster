import { Button } from "@heroui/react"
import { Link } from "react-router"

export default function NavBar () {
return (
  <div className="pb-2">
    <div className="sm:grid sm:grid-cols-3 gap-2 border-y border-y-blue-400 dark:border-y-blue-500">
      <div className="py-1">
        <Button
          color="primary"
          variant="light"
          as={Link}
          to="/random"
          className="w-full text-base"
        >
          Random Quote
        </Button>
      </div>
      <div className="py-1">
        <Button
          color="primary"
          variant="light"
          as={Link}
          to="/popular"
          className="w-full text-base"
        >
          Popular Quote
        </Button>
      </div>
      <div className="py-1">
        <Button
          color="primary"
          variant="light"
          as={Link}
          to="/new"
          className="w-full text-base"
        >
          Write Your Own
        </Button>
      </div>
    </div>
  </div>
)}
