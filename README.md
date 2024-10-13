A web application that allows users to create digital sketches and upload them to Pinata for storage on the IPFS network. The app features a user-friendly interface for drawing, downloading sketches, and securely storing them on a decentralized platform.


- Canvas Drawing: Intuitive drawing tools with various colors and brush sizes.
- Download Option: Save sketches as image files in JPG format.
- Pinata Integration: Upload sketches to Pinata for secure storage on IPFS.

Check out the live demo of the application here: [My Digital Sketchbook Demo](#)

## Installation

To run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Shefalidesai/sketchbook-pinata
   cd sketchbook-pinata
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your Pinata API credentials:

   ```plaintext
   NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt
   ```

4. **Run the application**:

   ```bash
   npm run dev
   ```

5. **Open your browser** and go to `http://localhost:3000`.

## Usage

1. Use the drawing tools to create your sketch on the canvas.
2. Click the **Download** button to save your sketch as a JPG file.
3. Click the **Upload** button to upload your sketch to Pinata for secure storage. You will receive an IPFS hash link upon successful upload.

## Technologies Used

- React
- Next.js
- HTML5 Canvas API
- Pinata API for IPFS storage