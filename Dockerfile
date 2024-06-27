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
RUN addgroup --system --gid 1001 next && adduser --system --uid 1001 zaibatsu
RUN chown -R zaibatsu:next /app
COPY --from=builder --chown=zaibatsu:next /app/.next ./.next
COPY --from=builder --chown=zaibatsu:next /app/node_modules ./node_modules
COPY --from=builder --chown=zaibatsu:next /app/package.json ./package.json
COPY --from=builder --chown=zaibatsu:next /app/public ./public
USER zaibatsu
EXPOSE 3000
CMD ["npm", "start"]