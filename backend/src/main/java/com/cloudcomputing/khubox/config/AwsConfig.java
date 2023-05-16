package com.cloudcomputing.khubox.config;

import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsConfig {

	@Value("${aws.region}")
	private String awsRegion;

	@Value("${aws.cognito.userPoolId}")
	private String userPoolId;

//	@Bean
//	public AWSCognitoIdentityProvider awsCognitoIdentityProvider() {
//		return AWSCognitoIdentityProviderClientBuilder.standard()
//				.withRegion(awsRegion)
//				.withCredentials(new DefaultAWSCredentialsProviderChain())
//				.build();


	@Value("${aws.s3.region}")
	private String region;

	@Bean
	public AmazonS3 setS3Client() {
		AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

		return AmazonS3ClientBuilder.standard()
				.withCredentials(new AWSStaticCredentialsProvider(credentials))
				.withRegion(region)
				.build();
	}

}