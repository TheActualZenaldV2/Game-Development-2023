#include <stddef.h> // For size_t
#define WASM_EXPORT __attribute__((visibility("default")))

WASM_EXPORT
const char* main() {
  return "Hello, mr jeremy ellis....!";
}
