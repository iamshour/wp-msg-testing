import { axiosPrivate } from "../api"
import useRefreshToken from "../hooks/useRefreshToken"

export default function AuthTesting() {
	const refresh = useRefreshToken()

	const handleClick = async () => {
		const { data } = await axiosPrivate.get("/identity/login")
		console.log(data)
	}

	return (
		<>
			<button
				onClick={handleClick}
				style={{ padding: "10px", backgroundColor: "#000", color: "white", cursor: "pointer" }}>
				Handle Click
			</button>
			<button
				onClick={() => refresh()}
				style={{
					padding: "10px",
					backgroundColor: "orange",
					color: "white",
					marginLeft: 20,
					cursor: "pointer",
				}}>
				Refresh
			</button>
		</>
	)
}
