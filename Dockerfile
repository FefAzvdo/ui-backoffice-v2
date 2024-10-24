FROM node:20.9.0-alpine as build-deps
WORKDIR /usr/src/app

COPY . ./

RUN yarn install
RUN npm run build

FROM mesosphere/aws-cli:latest as deploy
ARG AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID

ARG AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

ARG UI_VERSION=UI_VERSION
ENV UI_VERSION=$UI_VERSION

COPY --from=build-deps /usr/src/app/build /ui-empresa
WORKDIR /ui-empresa

RUN aws s3 cp --recursive /ui-empresa s3://io.billingpay.com.br/dev/empresa/v${UI_VERSION}  --force --grant read=uri=http://acs.amazonaws.com/groups/global/AllUsers
RUN aws s3 cp --recursive /ui-empresa s3://io.billingpay.com.br/homolog/empresa/v${UI_VERSION}  --force --grant read=uri=http://acs.amazonaws.com/groups/global/AllUsers
RUN aws s3 cp --recursive /ui-empresa s3://io.billingpay.com.br/demo/empresa/v${UI_VERSION}  --force --grant read=uri=http://acs.amazonaws.com/groups/global/AllUsers
RUN aws s3 cp --recursive /ui-empresa s3://io.billingpay.com.br/jae/empresa/v${UI_VERSION}  --force --grant read=uri=http://acs.amazonaws.com/groups/global/AllUsers
