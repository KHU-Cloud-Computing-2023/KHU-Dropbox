package com.cloudcomputing.khubox.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Entity
@Data
@Table(name = "members")
public class Member {
	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty
	private String loginId;

	@NotEmpty
	private String name;

	@NotEmpty
	private String password;

	private String email;

	private String work;

	private String education;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}