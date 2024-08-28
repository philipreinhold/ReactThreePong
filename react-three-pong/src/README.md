# 3D Pong Style Game

#### Video Demo
(https://youtu.be/okflGRyM2ZI)

#### Description:

As a Millennial who’s really into 80s Synthwave graphics :-), I’ve always wanted to dive into building something with Three.js and React. This project is one of my Three.js playgrounds of just a minimalist 3D Pong-inspired game where I get to blend code and art using modern JavaScript and WebGL frameworks. I love using THree already a lot with A-Frame and VR/AR projects at work.

Here my idea was to take some of our childhood classics, like arcade-style Pong, and give it a modern, 3D twist that fits right into that 80s Synthwave vibe. It's simple and I really love these style, and it was a fun reason to dive even deeper into React Three Fiber. I feel like this combo is where I'll be spending a lot of my creative coding energy in my coming years.

Frameworks and Tools
I went with React cause it’s my go-to for web projects these days, or the one where i focus most, even already before cs50 i digged into some self-tought react front-end projects. It makes handling the game state pretty straightforward and Three.js was the obvious choice for the 3D part because, let’s face it, it has a lot of potential for modern internet graphics and style, i think the whole webGL thing has a huge potential for gamification and a possible even AR/VR future? So the React Three Fiber Framework was perfect for bridging React with Three.js, letting me build these 3D scene in a way that felt natural and intuitive.

Before diving into the actual game, I spent some time playing around with Three.js and synthwave / wireframe graphics, I also revisited some old JavaScript fundamentals next to the cs50 course by reading "JavaScript" by O'Reilly.

Learning and Technical Process
I started by sketching out the game logic on paper, then pseudocode like I would’ve done with any language. Then, i had node.js already isntaled i installed the react thre fibre packages via npm and added some plugins for three like postprocessing. After tests which really helped to map out how the ball could move, how the paddles can interact, and how scoring would work. I tried building a better structure first but got trouble with the code and came back with putting it all into the ./src folder. Once I had that done, testing and seeing it while working on it live in the browser with node server and React and Three.js was a pretty smooth process.

Game Logic and How It All Came Together
So, the core of the game relies on Three.js’s Vector3 for handling the ball's movement and collision detection. It’s cool because instead of dealing with complex calculations like you would in C, Three.js gives you a clean, intuitive way to manage the ball's direction and speed already.

https://threejs.org/docs/#api/en/geometries/BoxGeometry
positioning and movement example:
const velocity = new THREE.Vector3(0.1, 0.1, 0); where we got all coordinates x, y, z for the vectors.
ball.position.add(velocity); 
And this little snippet does a lot of the heavy lifting. In C as example, I’d have to write out all the vector math manually, hardcode, but here, Three.js got all these functioned covered for my front end work. Then, to keep the paddles from going off-screen, 
I used MathUtils.clamp to limit their movement:
paddle.position.y = THREE.MathUtils.clamp(paddle.position.y, -4, 4);

The ball mechanics were fun to set up. When the ball hits a paddle, it changes direction based on the angle of impact. It’s a simple tweak, but it makes the game feel a lot more dynamic:
const newAngle = ((ball.position.y - paddle.position.y) / paddleHeight) * (Math.PI / 4);
velocity.set(Math.cos(newAngle) * speed, Math.sin(newAngle) * speed, 0);

Adding sound effects is maybe the most simple step in bringing a game to life or give depth. I used the useSound hook to trigger a satisfying “ping” every time the ball hits a paddle. It’s those little details that make the game feel complete.
if (collisionWithPaddle) {
    playPaddleSound(); 
}
its just two pong sounds i found on a free sound libary.

And! The opponent "ai" which is no ai.
The function is pretty simple, so we reference the Ball and let the paddle follow the postion with a delay of *0.05 which let it not always win or snap and the 4 -4 vectors make sure it stays within the position or boudnaries of our field.
const ball = state.scene.getObjectByName('ball');
   if (ball && ball.position) {
      const targetY = ball.position.y;
      paddle.position.y += (targetY - paddle.position.y) * 0.05;
      paddle.position.y = THREE.MathUtils.clamp(paddle.position.y, -4, 4);
   }
}

And the cool thing with node.js is - i can see in my browser what i´m doing :-P.

But using Frameworks and Libaries is why Documentation and Forums Were Crucial
The Three.js documentation and forums are more then helpfull. Whenever I hit a snag or wanted to implement a specific feature, the community on discourse.threejs.org is where find help. Dame for the official React Three Fiber documentation—it really broke down complex concepts into manageable pieces, making it way easier to get up and running with 3D in React.

My design choices
The decision to use React Three Fiber was mainly because I was curious about blending art and code inside React with Three.js. The Synthwave theme was always in the back of my mind, guiding the visual choices—like the neon colors and retro effects. And I also wanted to use post-processing techniques like Bloom and Vignette to really nail bit of that 80s vibe.

Acknowledgements
Sure CS50: For giving me a strong foundation in programming, which made this whole project possible, and motivated to finish a project, understand the deep things behind like memory handling - even js is a garbage collector but what is all running behind helped my a lot to deepen my knowledge and im glad for that time spending almost every day the past 3 motnh.
The React Three Fiber Documentation: Essentials for getting started with integrating 3D scenes into React components.
O’Reilly’s JavaScript Book: "JavaScript: The Definitive Guide" was my go-to resource for brushing up on JavaScript fundamentals and with me already since some years.
Three.js Documentation & Forum: These were ms go to places for figuring out tricky parts of the game as well as the community of creatrive code programmers which keeps inspiring. I spent a lot of time on discourse.threejs.org getting tips and learning from the community.
How to Run It
If you want to check it out yourself, here’s how you can get it running on your own machine:

First, make sure you have Node.js installed.
Clone this repository to your local setup.
Open your terminal and navigate to the project directory.
Run this command to install all the dependencies:

npm install react three @react-three/fiber @react-three/drei @react-three/postprocessing
After that, start the development server with:

npm start
Now, just open your browser and go to http://localhost:3000 to play the game. You may will miss the Audio files, then just delete the code for the audio in the App.js and Paddle.js

Thanks! 

Philip Reinhold