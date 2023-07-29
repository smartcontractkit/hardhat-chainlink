FROM smartcontract/chainlink:1.8.0-root

RUN mkdir /chainlink

# Define arguments to be passed from compose file
ARG API_USER_EMAIL
ARG API_USER_PASSWORD
ARG WALLET_PASSWORD

# Create chainlink node required values to initialize with
RUN echo $API_USER_EMAIL > /chainlink/.api
RUN echo $API_USER_PASSWORD >> /chainlink/.api
RUN echo $WALLET_PASSWORD > /chainlink/.password
