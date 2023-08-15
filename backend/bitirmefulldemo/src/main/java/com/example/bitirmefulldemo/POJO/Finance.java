package com.example.bitirmefulldemo.POJO;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;


@NamedQuery(name="Finance.getFinance",query = "select new com.example.bitirmefulldemo.wrapper.FinanceWrapper(m.id,m.taskId,m.tip,m.odeyen,m.odemeAlan,m.aciklama,m.tutar,m.odeyenTelefon,m.createDateTime,m.isDeleted,m.userId) from Finance m where m.userId=:userId and m.isDeleted=true")
@NamedQuery(name="Finance.getFinanceConstraint",query = "select new com.example.bitirmefulldemo.wrapper.FinanceWrapper(m.id,m.taskId,m.tip,m.odeyen,m.odemeAlan,m.aciklama,m.tutar,m.odeyenTelefon,m.createDateTime,m.isDeleted,m.userId) from Finance m where m.userId=:userId and m.taskId=:taskId and m.isDeleted=true")
@NamedQuery(name="Finance.deleteFinance",query="update Finance m set m.isDeleted=false where m.id=:id")
@NamedQuery(name="Finance.getFinanceById",query="select new com.example.bitirmefulldemo.wrapper.FinanceWrapper(m.id,m.taskId,m.tip,m.odeyen,m.odemeAlan,m.aciklama,m.tutar,m.odeyenTelefon,m.createDateTime,m.isDeleted,m.userId) from Finance m where m.id=:id and m.isDeleted=true")
@NamedQuery(name="Finance.getGelir",query="select sum(m.tutar) from Finance m where m.tip='Gelir' and m.isDeleted=true and m.taskId=:taskId group by m.taskId")
@NamedQuery(name="Finance.getGider",query="select sum(m.tutar) from Finance m where m.tip='Gider' and m.isDeleted=true and m.taskId=:taskId group by m.taskId")
@NamedQuery(name="Finance.updateFinance",query="update Finance m set m.aciklama=:aciklama,m.odemeAlan=:odemeAlan,m.odeyenTelefon=:odeyenTelefon,m.tutar=:tutar,m.odeyen=:odeyen,m.tip=:tip where m.id=:id")

@Entity
@DynamicUpdate
@DynamicInsert
@Data
@Table(name="finance")
public class Finance implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer taskId;
    private String tip;
    private String odeyen;
    private String odemeAlan;
    private String aciklama;
    private Integer tutar;
    private String odeyenTelefon;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createDateTime;
    private boolean isDeleted;
    private int userId;

}
