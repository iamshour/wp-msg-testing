import { axiosPrivate } from "../api"

export default function useRefreshToken() {
	const refresh = async () => {
		const { data } = await axiosPrivate.get("/identity/refresh")

		return data
	}

	return refresh
}
