int magic(int a, int b) {
  return a * b + 13;
}

int test(int a, int b) {
  return a / b - 12;
}

int main() {
  int x = 25;
  int y = 13;

  return magic(x, y);
}