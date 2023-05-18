package com.cloudcomputing.khubox.config;

import com.amazonaws.auth.*;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
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
//	}


	@Value("${aws.s3.region}")
	private String region;

	@Bean
	public AmazonS3 setS3Client() {
		AWSCredentialsProvider credentialsProvider = new DefaultAWSCredentialsProviderChain();

		return AmazonS3ClientBuilder.standard()
				.withCredentials(credentialsProvider)
				.withRegion(region)
				.build();
	}

}