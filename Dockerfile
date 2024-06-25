FROM node:21.7-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN  npm install
COPY . .
RUN npm install -g npm@10.4.0
RUN npm run build
# RUN rm -f .env.local

FROM node:21.7-alpine AS runner
WORKDIR /app
RUN groupadd -g 1001 next && useradd -u 1001 -g python -M -N -r -s /usr/sbin/nologin zaibatsu
RUN chown -R zaibatsu:next /app
COPY --from=builder --chown=zaibatsu:next /app/.next ./.next
COPY --from=builder --chown=zaibatsu:next /app/node_modules ./node_modules
COPY --from=builder --chown=zaibatsu:next /app/package.json ./package.json
COPY --from=builder --chown=zaibatsu:next /app/public ./public
USER zaibatsu
EXPOSE 3000
CMD ["npm", "start"]