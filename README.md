# React + Vite

![image](/public//assets/images//Holidaze-Screenshot.png)

- Deployed site: https://polite-sable-e2644b.netlify.app/

### Overview

This project involves the development of a React.js front-end client for an venue hosting site. The primary objectives were to create an attractive and responsive user interface, implement secure user authentication, allow the user to create and make book venues, and seamlessly integrate with the provided API.

### Developer

- Petter Martin Ånderbakk

### Approach

The project utilized React.js and Tailwind, emphasizing a modular and component-based architecture. JSON Web Tokens (JWT) were employed for secure user authentication, with LocalStorage ensuring persistent token storage for an enhanced user experience.

## Built with

- ReactJs https://react.dev/
- TailwindCSS https://tailwindcss.com/
- Vite https://vitejs.dev/
- Icons from: React icons https://react-icons.github.io/react-icons/
- TanStack Query https://tanstack.com/query/latest
- TanStack Router https://tanstack.com/router/v1
- Toast components from Sonner: https://sonner.emilkowal.ski/
- Animated Icons from Lordicon: https://lordicon.com/
- Animations from GSAP: https://gsap.com/ 
- Google Maps from: https://developers.google.com/maps

### Key Features

1. **User Authentication:**
   - Registration and authentication restricted to specific email domains (@noroff.no or @stud.noroff.no).
2. **Content Feed:**
   - Dynamic content feed with search functionality.
3. **Venue Management:**
   - Create, edit, delete, book and view venues in detail.


# Report

Holidaze

- Introduction
I developed a venue booking website using React and tailwind. This project presented me with a opportunity to dive into these technologies, enhancing my skills and understanding of modern web development. 

- Project Overview
My primary objective was to create a user-friendly booking platform with essential features such as venue browsing, individual venue pages, updating management, and a streamlined booking process. Using the Noroff API, I fetched product data to populate our website.

- Design
The Design went through many different iterations. I took alot inspiration from similiar venue booking websites like AirBnB. Using very similiar colors aswell with a mix of white, dark gray and rose color. I wanted to create a professional, easy to understand and trustworthy website. At the same time I dont want to copy them either but everywhere I looked alot of these websites used a very similiar look and I started to understand why. They are very modern and elegant colors. Often associated with purity, relaxation and romance. Which is exactly what customers that go to these sites want to experience. So I found that using different colors than white and rose just didnt give the same impact I was looking for.

- Animation
When I started this project I wanted to try to use more animation in my website and I heard one of the best new ways of doing that is with GSAP. So I looked through a few tutorials on youtube about it and decded to try it out. It was alot more difficult than I imagined and also not alot of places where I felt it would be natural to use animations on a website that I wanted to look as professional as possible. So I ended up not using it as much. However on the last day I found out about animated icons by Lordicon, and so I had to try them out. Still not a 100% sure if they fit or not, but it was definetively a nice thing to learn how to implement them. 

- Google Maps
With the help of a Google maps api key I was able to intergrate a dynamic world map feature into my website. Not as much as I would liked, and I had some major issues with it, I still managed to use it for what I wanted, which was to search for a location on a map. When people create their venues they can search in an input field and have their location show up on the map, that location will then ge set as the venues location.city and the latitude and longitude will be set aswell.

- Calendar 
The calendar I used for booking works very well for bookig but unfortunatively I didnt get to finish it with all the features I had planned. First off I wanted to use it in the searchbar, and use it to search for venues that has those dates available for booking. That I didnt get to do. Also inside the single venue page I wanted for users to see which dates have been booked. So right now there is no way of actually seeing which dates are actually booked.

- Optimalisation
This is where I struggled the most. All the videos and images I used on this website, which wasnt a lot, I ran through tinyPNG to compress them but even with all that I still get a pretty low score on Lighthouse perfromance. So there is definetively alot I can learn when it comes to optimalisation as these are tools we havent learned much about at school. 

- Conclusion
My journey in building this website was incredibly rewarding but also there is so much more to learn. It is pretty cool looking back how little I knew when I started and where I am now. Able to create these dynamic websites from scratch. I am excited about the future and excited to learn more things. There is especially a lot of Javascript I still struggle with to understand, but I am getting there and I promise myself I will work on it everyday to get better (well almost everyday).
