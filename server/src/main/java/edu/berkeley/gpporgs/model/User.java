package edu.berkeley.gpporgs.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author Victor Korir
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users")
public class User {
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    private @NonNull String email;
    private @NonNull String firstName;
    private String lastName;
    private @NonNull Boolean isAdmin;
    private @NonNull Long creationTime;
    private @NonNull Integer numberOfLogin;
    private @NonNull Long lastLogin;
}