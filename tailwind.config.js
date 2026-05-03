@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global Reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #0a0a0a; /* لون الرمادي الداكن (Charcoal) */
  color: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow-x: hidden;
}

/* Custom Scrollbar - Aqua Theme */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #111111;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #00FFFF; /* لون السماوي (Cyan/Aqua) */
  border-radius: 3px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
