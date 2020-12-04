
function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function permutation(arr, start, end) {
  if (start === end) {
    console.log(arr);
  } else {
    for (let i = start; i <= end; i++) {
      swap(arr, start, i);
      permutation(arr, start + 1, end);
      swap(arr, start, i);
    }
  }
}

permutation([0, 1, 2, 3], 0, 3);