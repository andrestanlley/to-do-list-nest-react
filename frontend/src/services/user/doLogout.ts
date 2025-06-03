export default function doLogout() {
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie =
		"userdata=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
