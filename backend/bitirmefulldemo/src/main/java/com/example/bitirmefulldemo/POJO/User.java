package com.example.bitirmefulldemo.POJO;



import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@NamedQuery(name="User.findByEmailId",query = "select u from User u where u.email=:email")
@NamedQuery(name="User.getAllUser", query = "select new com.example.bitirmefulldemo.wrapper.UserWrapper(u.id,u.name,u.email,u.contactNumber,u.status,u.createDateTime,u.updateDateTime) from User u where u.role='user'")
@NamedQuery(name="User.updateStatus",query = "update User u set u.status=:status where u.id=:id")
@NamedQuery(name="User.getAllAdmin", query = "select u.email from User u where u.role='admin'")

@Entity
@DynamicUpdate
@DynamicInsert
@Data
@Table(name="user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String contactNumber;
    private String email;
    private String password;
    private String status;
    private String role;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createDateTime;
    @UpdateTimestamp
    private LocalDateTime updateDateTime;
}
