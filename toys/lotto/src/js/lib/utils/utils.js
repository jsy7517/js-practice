export const shuffleArray = (arr) => {
	const newArr = arr;
	return newArr.sort(() => Math.random() - 0.5);
};
