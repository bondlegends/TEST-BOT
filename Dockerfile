FROM node:lts-buster

RUN git clone https://github.com/bondlegends/blvckzer-mudiyan/ /root/bond legends

WORKDIR /root/BOND LEGENDS-MD

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

RUN npm install


CMD ["npm", "start"]
