package com.oncodock.oncodock.domain;

import java.util.List;
import java.util.Map;

public class BindingScore {
    private List<Map<String, String>> score;
    

	public BindingScore(List<Map<String, String>> score) {
		super();
		this.score = score;
	}

	public List<Map<String, String>> getScore() {
		return score;
	}

	public void setScore(List<Map<String, String>> score) {
		this.score = score;
	}


}
