FROM public.ecr.aws/docker/library/node:18-alpine as builder

WORKDIR /app

# COPY REQUIRED ROOT FOLDERS
COPY ./package*.json ./
COPY ./tsconfig.base.json ./
COPY ./nx.json ./
COPY ./prisma ./prisma

RUN yarn

COPY  /apps/shtifh/admin/server ./apps/shtifh/admin/server

# COPY NEEDED LIBRARIES
COPY /libs/api/modules/admin/shtifh ./libs/api/modules/admin/shtifh
COPY /libs/api/shared/decorators ./libs/api/shared/decorators
COPY /libs/api/shared/entities ./libs/api/shared/entities
COPY /libs/api/shared/services/auth ./libs/api/shared/services/auth
COPY /libs/api/shared/services/data-access ./libs/api/shared/services/data-access
COPY /libs/api/shared/services/env ./libs/api/shared/services/env
COPY /libs/api/shared/services/jwt ./libs/api/shared/services/jwt
COPY /libs/api/shared/services/prisma ./libs/api/shared/services/prisma
COPY /libs/api/shared/services/user ./libs/api/shared/services/user

RUN npx prisma generate
RUN npx nx build --project=shtifh-admin-server

# PRODUCTION STAGE
FROM public.ecr.aws/docker/library/node:18-alpine

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

RUN yarn install --production

EXPOSE 5050

CMD ["node", "dist/apps/shtifh/admin/server/main.js"]