package com.example.bitirmefulldemo.POJO;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@NamedQuery(name="Task.getTask",query = "select new com.example.bitirmefulldemo.wrapper.TaskWrapper(m.id,m.isIcerigi,m.siparisTarihi,m.en,m.boy,m.adet,m.birimFiyat,m.tutar,m.durum,m.firma,m.isTask,m.isDeleted,m.isCompleted,m.userId,m.musteriId) from Task m where m.userId=:userId and m.isTask=true and m.isDeleted=true and m.isCompleted=false")
@NamedQuery(name="Task.getBid",query = "select new com.example.bitirmefulldemo.wrapper.TaskWrapper(m.id,m.isIcerigi,m.siparisTarihi,m.en,m.boy,m.adet,m.birimFiyat,m.tutar,m.durum,m.firma,m.isTask,m.isDeleted,m.isCompleted,m.userId,m.musteriId) from Task m where m.userId=:userId and m.isTask=false and m.isDeleted=true and m.isCompleted=false")
@NamedQuery(name="Task.getBidtoMusteriId",query="select new com.example.bitirmefulldemo.wrapper.TaskWrapper(m.id,m.isIcerigi,m.siparisTarihi,m.en,m.boy,m.adet,m.birimFiyat,m.tutar,m.durum,m.firma,m.isTask,m.isDeleted,m.isCompleted,m.userId,m.musteriId) from Task m where m.userId=:userId and m.musteriId=:musteriId and m.isTask=false and m.isDeleted=true and m.isCompleted=false")
@NamedQuery(name="Task.deleteTask",query="update Task m set m.isDeleted=false where m.id=:id")
@NamedQuery(name="Task.getTaskById",query="select new com.example.bitirmefulldemo.wrapper.TaskWrapper(m.id,m.isIcerigi,m.siparisTarihi,m.en,m.boy,m.adet,m.birimFiyat,m.tutar,m.durum,m.firma,m.isTask,m.isDeleted,m.isCompleted,m.userId,m.musteriId) from Task m where m.id=:id and m.isDeleted=true")
@NamedQuery(name="Task.changeToTask",query="update Task m set m.isTask=true where m.id=:id")
@NamedQuery(name="Task.changeToBid",query="update Task m set m.isTask=false where m.id=:id")
@NamedQuery(name="Task.completedToTask",query="update Task m set m.isCompleted=true where m.id=:id")
@NamedQuery(name="Task.updateTask",query="update Task m set m.isIcerigi=:isIcerigi,m.siparisTarihi=:siparisTarihi,m.en=:en,m.boy=:boy,m.adet=:adet,m.birimFiyat=:birimFiyat,m.tutar=:tutar,m.durum=:durum,m.firma=:firma where m.id=:id ")

@Entity
@DynamicUpdate
@DynamicInsert
@Data
@Table(name="task")
public class Task implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String isIcerigi;
    private String siparisTarihi;
    private String en;
    private String boy;
    private String adet;
    private String birimFiyat;
    private String tutar;
    private String durum;
    private String firma;
    private int musteriId;
    private int userId;
    private boolean isTask;
    private boolean isDeleted;
    private boolean isCompleted;
    /*@OneToMany(targetEntity = Finance.class,cascade = CascadeType.ALL)
    @JoinColumn(name="fk_tf",referencedColumnName = "id")
    private List<Finance> rec;*/
}
