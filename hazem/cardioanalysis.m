%Extract data from csv file. This is a training dataset from kaggle found
%here: https://www.kaggle.com/cherngs/heart-disease-cleveland-uci

smlmpath=fullfile(pwd, 'heart_cleveland_upload.csv');
dat=importdata(smlmpath);
rawdat=dat.data;

%% 

%There are 14 parameters. Some are binary values like cardio and sex. For
%detailed explaination of each attribute see link.
%Here we extract the column that separates the 2 classes, sick and healthy.
cardio = rawdat(:, 14);



%Extracting the data (age, sex, bp, etc..) of the healthy patients and the sick ones separately to then later be able
%to extract the covariance matrix for each class.

classH=rawdat(cardio==0, [1 2 3 4 5 6 7 8 9 10 11 12 13]);
classS=rawdat(cardio>0, [1 2 3 4 5 6 7 8 9 10 11 12 13]);

%Calculating the mean for every feature
meanH= mean(classH)';
meanS= mean(classS)';

%% 
%this is the vector of weights for LDA
v=inv(cov(classH)+cov(classS))*(meanH-meanS);

%calculates the new variable y=v1*f1+v2*f2...v13*f13 for the healthy  patients. The fis are the age,
%sex, etc..
Hvars=[];
for i= 1:160
    Hvars(i)=newVar(classH(i,:),v');
end
%% 
%calculates the new variable y=v1*f1+v2*f2...v13*f13 for the ill  patients. The fis are the age,
%sex, etc..
Svars=[];

for j= 1:137
    Svars(j)=newVar(classS(j,:),v');
end
%% 

%In this section we form the 2 Gaussians to later be able to select the
%most effective threshold.
x_vals=-10:0.001:10; 
pd1 = fitdist(Hvars','Normal'); %Gaussian for non-hypertensive (healthy) patients
pd2 = fitdist(Svars','Normal'); %Gaussian for hypertensive (ill) patients.
y1 = pdf(pd1,x_vals);
y2=pdf(pd2,x_vals);
grid on
plot(x_vals,y1,'LineWidth',1)
hold on
plot(x_vals,y2,'LineWidth',2)
legend('Healthy','At Risk of Heart Disease')
xlabel('Y')
ylabel('P(Y)')
%% 
T=-10:0.1:10; %different threshold values
%Extracting the means and standard deviations of both Gaussian distribution. 
%This allows us to calculate things like accuracy, TP (true positives), TN (true negatives), etc
%mu1 and sigma1 correspond to the non-hypertensive patients and mu2 and
%sigma2 correspond to hypertensive patients
mu1=-1.3019; 
mu2=-3.5527;
sigma1=0.9050;
sigma2=1.1966;


TN=100.*(1-normcdf(T,mu1,sigma1));
oneminusTP=100.*(1-normcdf(T,mu2,sigma2));
TP=100.*normcdf(T,mu2,sigma2);
FP=100.*normcdf(T,mu1, sigma1);
FN=100.*(1-normcdf(T,mu2, sigma2));
acc=(TP+TN)./(TP+TN+FP+FN);

%% 
%Plotting the accuracies achieved with different threshold values to be
%able to select the most effective one ie the one that gives us the highest
%accuracy
plot(T,acc)
xlabel('Thresholds')
ylabel('Accuracy')
%% 
%Plot the ROC curve
plot(oneminusTP, TN, 'LineWidth', 2)
xlabel('1-Specificity')
ylabel('Sensitivity')
function  [out]=newVar(f,v)
'newVar'
out=sum(f.*v)
end