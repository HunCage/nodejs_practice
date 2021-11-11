function toUpper(str, callbackFn) {
	if (!callbackFn) {
		console.error("Not given callbackFn!");
        return;
	}

	try {
		str = str.toUpperCase();
		callbackFn(false, str);
	} catch (errorObject) {
		callbackFn(errorObject, str);
	}
}

module.exports = {
	tu: toUpper,
};
