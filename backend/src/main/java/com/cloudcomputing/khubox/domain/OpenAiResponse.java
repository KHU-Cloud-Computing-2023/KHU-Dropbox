package com.cloudcomputing.khubox.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenAiResponse {
	private List<Choice> choices;
	// getters and setters

	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Choice {
		private int index;
		private Message message;
		// getters and setters
	}
}