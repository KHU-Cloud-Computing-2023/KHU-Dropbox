package com.cloudcomputing.khubox.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenAiRequest {

	private String model;
	private List<Message> messages;
	private int n;
	private double temperature;
	private int max_tokens;

	// getters and setters
}